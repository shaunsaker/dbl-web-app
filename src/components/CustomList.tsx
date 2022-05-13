import React, {
  createRef,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import {
  FixedSizeList,
  FixedSizeListProps,
  ListOnScrollProps,
} from 'react-window'
import styled from 'styled-components'

type RowStyle = React.CSSProperties

export type CustomListOnScrollProps = ListOnScrollProps

export type CustomListCellProps<T> = {
  item: T
  index: number
  style: RowStyle
}

export interface CustomListProps<T>
  extends Omit<
    FixedSizeListProps,
    'itemSize' | 'children' | 'height' | 'itemCount' | 'width'
  > {
  rowHeight: number
  data: T[]
  renderItem: ({
    item,
    index,
    style,
  }: CustomListCellProps<T>) => React.ReactElement
}

// renders a performant render-in-view list
export const CustomList = <T extends { id: string }>({
  rowHeight,
  data,
  renderItem: renderItemCb,
  ...props
}: CustomListProps<T>): ReactElement => {
  const containerRef = createRef<HTMLDivElement>()

  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    setHeight(containerRef.current?.clientHeight || 0)
  }, [containerRef])

  const renderItem = useCallback(
    ({ index, style }: { index: number; style: RowStyle }) => {
      const item = data[index]

      return renderItemCb({ item, index, style })
    },
    [data, renderItemCb],
  )
  console.log('HERE', height)

  return (
    <Container ref={containerRef}>
      <FixedSizeList
        {...props}
        width="100%"
        height={height}
        itemCount={data.length}
        itemSize={rowHeight}
        itemData={data}
        itemKey={(index, data) => data[index].id}
      >
        {renderItem}
      </FixedSizeList>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
`
