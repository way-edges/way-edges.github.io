import Navi from '@/widgets/navi/Navi'
import { TocCurrentPosProvider } from '@/widgets/toc/TocState'
import { readJsonSync } from 'fs-extra'

export default async function Home() {
  const res = readJsonSync(process.cwd() + '/data/meta.json')
  return (
    <TocCurrentPosProvider>
      <Navi toc={res} />
    </TocCurrentPosProvider>
  )
}
