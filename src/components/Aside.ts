export type  Aside = {
  path: string
  label: string,
  name: string
  icon: string
}

export type AdminAside = {
  side:Aside[]
  name:string
}

export type  AsideIndex = {
  path: string
  label: string,
  name: string
  icon: string
  role: number
}