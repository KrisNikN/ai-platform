"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("6f9bf111-8644-406a-a19b-b2804ac68866");
  }, []);

  return null;
};
