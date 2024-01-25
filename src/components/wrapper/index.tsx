import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
export default async function Wrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = (await getServerSession(authOptions)) as any;
    const token = session?.accessToken;
    console.log(token);
  return (
    <div>{children}</div>
  )
}
