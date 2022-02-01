import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { TextField, Button, List, Box, Grid } from '@mui/material';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { TodoItem } from './todoItem';
import ItemTypes from './ItemTypes';
import { DBInterface } from './DBInterface';
import DB from './db';
import { auth } from './firebase_config';

export interface TodoItemInterface {
  id: string;
  context: string;
}

export interface findCardResultInterface {
  todo: TodoItemInterface;
  index: number;
}

export const Todo: React.VFC = React.memo(function Todo(): React.ReactElement {
  const db: DBInterface = DB.getInstance();
  const [todoContext, setTodoContext] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoItemInterface[]>([]);
  const navigate = useNavigate();

  useEffect((): void => {
    db.getData().then((data: TodoItemInterface[]) => {
      setTodoList(data);
    });
  }, []);

  const findCard = useCallback(
    (id: string): findCardResultInterface => {
      const todo = todoList.filter((item) => `${item.id}` === id)[0];
      return {
        todo,
        index: todoList.indexOf(todo),
      };
    },
    [todoList]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { todo, index }: findCardResultInterface = findCard(id);
      setTodoList(
        update(todoList, {
          $splice: [
            [index, 1],
            [atIndex, 0, todo],
          ],
        })
      );
    },
    [findCard, todoList, setTodoList]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.TODOITEM }));

  return (
    <Box sx={{ margin: 'auto', width: '50%' }}>
      <Grid mt={2} container spacing={1} alignItems="center" direction="row">
        <Grid item xs>
          <TextField
            // required
            fullWidth
            label="やるべきこと"
            size="small"
            value={todoContext}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTodoContext(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              db.saveData(todoContext).then((data: TodoItemInterface[]) => {
                setTodoContext('');
                setTodoList(data);
              });
            }}
          >
            登録
          </Button>
        </Grid>
      </Grid>
      <List>
        <Box ref={drop}>
          {todoList.map((todoItem: TodoItemInterface) => (
            <TodoItem
              key={todoItem.id}
              id={`${todoItem.id}`}
              context={todoItem.context}
              moveCard={moveCard}
              removeFunc={() => {
                setTodoList(db.removeData(todoItem));
              }}
              findCard={findCard}
              updateOrder={() => {
                db.updateOrder(todoList);
              }}
            />
          ))}
        </Box>
      </List>
      <Button
        variant="contained"
        onClick={() => {
          signOut(auth).then(() => {
            navigate('/');
          });
        }}
      >
        ログアウト
      </Button>
    </Box>
  );
});
