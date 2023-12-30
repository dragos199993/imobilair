import { FC, ReactElement } from 'react'

export const EditorBarContainer: FC<{
  children: ReactElement | ReactElement[]
}> = ({ children }) => {
  return (
    <div className="invisible absolute -top-6 z-50 flex h-8 w-full items-center justify-start gap-2 rounded-lg border-2 border-secondary bg-secondary group-hover:visible ">
      {children}
    </div>
  )
}
