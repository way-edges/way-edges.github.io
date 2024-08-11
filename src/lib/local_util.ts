import path from 'path'

export function get_file_under_data(p: string) {
  return path.join(process.cwd(), 'data', p)
}
