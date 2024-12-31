import { getCreditClaims } from "@/actions/credits";
import { auth } from "@/auth";
import React from "react";
import { CreditTableComponent } from "./CreditTableComponent";

export default async function CreditTable() {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  const { id } = session.user;
  const data = await getCreditClaims(id as string);

  return <CreditTableComponent data={data} />;
}
