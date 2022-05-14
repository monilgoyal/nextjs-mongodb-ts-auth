import React from "react";
import { GetServerSidePropsContext } from "next";
// import Head from "next/head";
import Login from "../components/login";
import { userFromRequest } from "../web/tokens";

interface User {
  email: string;
  name: string;
}

interface Props {
  user?: User;
}

export default function Home({ user }: Props) {
  if (!user) return <Login />;

  return (
    <div className="text-white">Hello {user.name}</div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await userFromRequest(context.req);

  if (!user) return { props: {} };

  return {
    props: { user: JSON.parse(JSON.stringify(user)) }
  };
}