import { JSX } from '@babel/types'
import { PropsWithChildren } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import classNames from 'classnames'

interface InfoHoverPopoverProps {
  description: string
  className?: string
}

export function InfoHoverPopover (props: PropsWithChildren<InfoHoverPopoverProps>): JSX.Element {
  return (
    <HoverPopover popover={props.description}>
      <div className={classNames('cursor-help group', props.className)}>
        <IoMdInformationCircleOutline className='h-4 w-4 text-gray-500' />
      </div>
    </HoverPopover>
  )
}
