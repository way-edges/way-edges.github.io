import { redirect } from 'next/navigation'
import { getMeta } from './cache'

export default async function Home() {
  const toc = getMeta()
  redirect(toc[0].name_path)
}
