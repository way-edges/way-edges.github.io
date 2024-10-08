import Toc from '@/widgets/toc/Toc'

export default function SidePane() {
  return (
    <aside className="border-r-2 w-[var(--aside-width)] side-pane">
      <Toc />
    </aside>
  )
}
