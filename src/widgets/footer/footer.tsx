const a = `
"YOU ⭐ YOU WIN A BILLION$$$"
                       ———— Someone from YTB

`
  .trimStart()
  .trimEnd()
const b = `
"'Star⭐' true as the ten"
                       ———— Someone from tenakth
`
  .trimStart()
  .trimEnd()

const footer_words = [a, b]

export default async function Footer() {
  console.log(a, b)
  let index = Math.floor(Math.random() * footer_words.length)
  return (
    <footer className="h-[100px] bg-[var(--nav-background)] flex justify-center items-center">
      <p className="text-center whitespace-break-spaces font-mono ">{footer_words[index]}</p>
    </footer>
  )
}
