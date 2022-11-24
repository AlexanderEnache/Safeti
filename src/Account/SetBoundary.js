import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import { DataStore } from 'aws-amplify';
import { Bounds } from '../models';
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTodoModal = ({ modalVisible, setModalVisible, email, dependentEmail, location }) => {
//   const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [guardian, setGuardian] = useState('');
  const [size, setSize] = useState('');
  const [time, setTime] = useState('');

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  async function addTodo() {
    console.log(location);
    await DataStore.save(new Bounds({ name: name, email: dependentEmail, guardian: email, startTime: start,  endTime: end, location: location, size: 555}));
    setModalVisible(false);
    setName('');
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={closeModal}
      transparent
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Pressable onPress={closeModal} style={styles.modalDismissButton}>
            <Text style={styles.modalDismissText}>X</Text>
          </Pressable>
          <DateTimePicker
            mode={"time"}
            value={start}
            // onChange={setStart}
            />
          <DateTimePicker
            mode={"time"}
            value={end}
            // onChange={setEnd}
          />
          <TextInput
            onChangeText={setName}
            placeholder="Name"
            style={styles.modalInput}
          />
          <Pressable onPress={addTodo} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save Todo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = DataStore.observeQuery(Bounds).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
      setTodos(items);
    });
    console.log(todos);
    //unsubscribe to data updates when component is destroyed so that we don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }

  }, []);

  async function deleteTodo(todo) {
    try {
      await DataStore.delete(todo);
    } catch (e) {
      console.log('Delete failed: $e');
    }
  }

  async function setComplete(updateValue, todo) {
    //update the todo item with updateValue
    await DataStore.save(
      Todo.copyOf(todo, updated => {
        updated.isComplete = updateValue
      })
    );
  }

  const renderItem = ({ item }) => (
    // <Text>{item.email}</Text>
    <View
      style={styles.todoContainer}
    >
      <Text>
        <Text>{item.name}</Text>
      </Text>
      <Pressable style={[styles.checkbox, item.isComplete && styles.completedCheckbox]}
      onPress={() => {
        deleteTodo(item);
      }}
    ><Text>X</Text></Pressable>
    </View>
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  );
};

const SetBoundary = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if(route.params.location != null){
        setModalVisible(true);
        // setLocation(location);
    }
  }, []);

  return (
    <>
      <TodoList />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonContainer, styles.floatingButton]}
      >
        <Text style={styles.buttonText}>+ Add Todo</Text>
      </Pressable>
      <AddTodoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        email={route.params.email}
        dependentEmail={route.params.dependentEmail}
        location={route.params.location}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4696ec',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
  },
  todoContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  todoHeading: {
    fontSize: 20,
    fontWeight: '600',
  },
  checkbox: {
    // borderRadius: 2,
    // borderWidth: 2,
    fontWeight: '700',
    height: 20,
    marginLeft: 'auto',
    textAlign: 'center',
    width: 20,
  },
  completedCheckbox: {
    backgroundColor: '#000',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default SetBoundary;