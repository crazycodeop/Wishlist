import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SadFace from "@/components/ui/icons/SadFace";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react";
import CreateCollectionbtn from "@/components/CreateCollectionBtn";
import CollectionCard from "@/components/CollectionCard";

export default async function Home() {
  return <>
  <Suspense fallback={<WelcomeMsgFallback />}>
    <WelcomeMsg />
  </Suspense>
  <Suspense fallback={<div>Loading collections...</div>}>
  <CollectionList />
  </Suspense>
  </>
}

async function WelcomeMsg() {
  const user= await currentUser();
  if(!user){
    return <div>error</div>
  }
  return (
    <div className="flex w-full mb-12">
    <h1 className="text-4xl font-bold">Welcome, <br /> {user.firstName} {user.lastName}</h1>
    </div>
  )
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
    <h1 className="text-4xl font-bold">
      <Skeleton className="w-[150px] h-[36px]"/>
      <Skeleton className="w-[150px] h-[36px]"/>
    </h1>
    </div>
  )
}

async function CollectionList(){
  const user=await currentUser();
  const collections=await prisma.collection.findMany({
    include: {
      tasks: true
    },
    where: {
      userId: user?.id,
    },
  });

  if(collections.length === 0){
    return (
      <div className="flex flex-col gap-5 mt-4">
        <Alert>
      <SadFace />
      <AlertTitle>
        There are no collections yet!
      </AlertTitle>
      <AlertDescription>
        Create a collection to get started
      </AlertDescription>
      </Alert>
      <CreateCollectionbtn />
      </div>
    )
  }

  return (
    <>
    <CreateCollectionbtn />
    <div className="flex flex-col gap-4 mt-6">
    {collections.map(collection => (
      <CollectionCard key={collection.id} collection={collection} />
    ))}
    </div>
    </>
  )

}
