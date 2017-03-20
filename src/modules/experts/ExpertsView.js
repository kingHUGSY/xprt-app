import React, {Component} from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import debounce from 'lodash/debounce';

// Don't care about propTypes in modules
/* eslint-disable react/prop-types */

import {Container, Content, Badge, Button, Header, Icon, Input,
  Item, ListItem, List, Left, Body, Right, Thumbnail, Spinner} from 'native-base';

class ExpertsView extends Component {
  componentDidMount() {
    this.props.getExperts();
  }
  static navigationOptions = {
    tabBar: () => ({
      icon: ({tintColor: color}) => (
        <Icon name="ios-person-outline" style={{color}}/>
      ),
      visible: true
    }),
  };

  open = (expertId) => {
    this.props.navigate({
      routeName: 'ExpertDetails',
      params: {
        expertId
      }
    });
  };

  renderRow = (expert) => {
    let subjects = expert.subjects;
    subjects = ['foo', 'bar', 'fiz'];
    console.log('Subjektien tyyppi', typeof (expert.subjects), expert.subjects);
    return (
      <ListItem button avatar key={expert.id} onPress={() => {this.open(expert.id);}} >
        <Left>
          <Thumbnail source={{uri: expert.imageUrl || ''}}/>
        </Left>
        <Body>
          <Text> {expert.name} </Text>
          <Text note style={styles.rowText}> {expert.title} </Text>
          <Text note style={styles.rowText}> {expert.area} </Text>
        </Body>
        <Right>
          <Icon name='arrow-forward'/>
        </Right>
      </ListItem>
    );
  }

  render() {
    const {experts, loading, getExperts} = this.props;

    return (
      <Container>
        <Content>
          <CustomHeader onSubmit={getExperts}/>

          { loading
            ? <Spinner />
            : <List dataArray={experts} renderRow={this.renderRow}/>
          }
        </Content>
      </Container>
    );
  }
}

class CustomHeader extends Header {
  state = {
    text: ''
  };

  debouncedSubmit = debounce((text) => {
    const {onSubmit} = this.props;

    onSubmit(text);
  }, 300);

  onChangeText = (text) => {
    this.setState({text});
    this.debouncedSubmit(text);
  };

  render() {
    const {onSubmit} = this.props;

    return (
      <Header searchBar rounded>
        <Item>
          <Icon name='search' />
          <Input placeholder='Experts search' onChangeText={this.onChangeText} />
          <Icon active name='people' />
        </Item>
        <Button transparent onPress={() => onSubmit(this.state.text)}>
          <Text> Search </Text>
        </Button>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#640DE8'
  },
  content: {
    backgroundColor: '#640DE8'
  },
  rowText: {
    color: 'skyblue'
  },
  subtitleView: {
    paddingLeft: 10,
    paddingTop: 5
  },
  subtitleText: {
    marginRight: 7,
    color: 'white',
    backgroundColor: '#D8D8D8',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 7
  },
  tagsWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list: {
    flex: 1,
    marginTop: 0
  }
});

export default ExpertsView;