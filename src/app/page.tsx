import Navi from '@/widgets/navi/Navi'
import { TocCurrentPosProvider } from '@/widgets/toc/TocState'

export default function Home() {
  return (
    <TocCurrentPosProvider>
      <Navi />
    </TocCurrentPosProvider>
  )
}
