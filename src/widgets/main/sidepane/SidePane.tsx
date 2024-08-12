import Toc from '@/widgets/toc/Toc'

export default function SidePane() {
  return (
    <aside className="border-r-2 w-[var(--aside-width)] h-full pt-[var(--nav-height)] sticky top-0 max-h-screen mt-[calc(var(--nav-height)*-1)]">
      <Toc />
    </aside>
  )
}
