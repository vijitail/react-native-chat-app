import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Block, Input} from 'galio-framework';
import {useNavigation} from '@react-navigation/native';

import useDebounce from '../../hooks/useDebounce';

import {searchUsers} from '../../actions/search';
import {initializeChat} from '../../actions/chat';

import Chat from '../../components/Chat';

const AddUser = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const navigation = useNavigation();

  useEffect(() => {
    props.searchUsers(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleTextChange = (value) => {
    setSearchValue(value);
  };

  const handleInitChat = (user) => {
    props.initializeChat(user, props.activeUserId);
    navigation.navigate('Chat');
  };

  return (
    <Block safe flex>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Search Users..."
          value={searchValue}
          onChangeText={handleTextChange}
        />
      </View>
      <FlatList
        data={props.users}
        renderItem={({item}) => (
          <Chat onPress={() => handleInitChat(item)} user={item} />
        )}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={{marginBottom: 100}}
      />
    </Block>
  );
};

const mapStateToProps = ({searchResults, auth}) => ({
  users: searchResults,
  activeUserId: auth.user ? auth.user.id : null,
});

export default connect(mapStateToProps, {searchUsers, initializeChat})(AddUser);

const styles = StyleSheet.create({
  inputContainer: {
    height: 100,
    justifyContent: 'center',
  },
});
