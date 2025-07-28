"use server"

import { fetchNewsData } from "@/lib/data"

export async function getNewsData() {
  return await fetchNewsData()
}
