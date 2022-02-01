import { ListItem, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { CSSProperties } from 'react';
import { DragLayerMonitor, useDragLayer } from 'react-dnd';
import ItemTypes from './ItemTypes';

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  width: '50%',
};

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px) scale(1.05)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

export default function PreviewComponent(): React.ReactElement | null {
  const { item, itemType, currentOffset, isDragging } = useDragLayer(
    (monitor: DragLayerMonitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );
  function renderItem() {
    switch (itemType) {
      case ItemTypes.TODOITEM:
        return (
          <ListItem
            secondaryAction={
              <IconButton>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={item.context} />
          </ListItem>
        );
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>{renderItem()}</div>
    </div>
  );
}
