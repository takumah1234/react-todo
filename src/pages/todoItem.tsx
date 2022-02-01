/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { IconButton, ListItemText, ListItem, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

interface DragItem {
  id: string;
  originalIndex: number;
}

export function TodoItem({
  id,
  context,
  removeFunc,
  moveCard,
  findCard,
  updateOrder,
}): React.ReactElement {
  const originalIndex: number = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TODOITEM,
      item: { id, originalIndex, context },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex: originalIndexFinal } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndexFinal);
        } else {
          updateOrder();
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TODOITEM,
      canDrop: () => false,
      hover({ id: draggedId }: DragItem) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity }}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            onClick={() => {
              removeFunc();
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        key={id}
      >
        <ListItemText primary={context} />
      </ListItem>
      <Divider />
    </div>
  );
}
