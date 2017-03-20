import React, {PropTypes, Component} from 'react';
import {
  View,
  ListView,
  StyleSheet
} from 'react-native';

import {Body, Left, Right, Thumbnail, Content, Container, ListItem, Text, Icon, List} from 'native-base';

class LecturesView extends Component {
  componentDidMount() {
    this.props.getLectures();
  }
  static navigationOptions = {
    tabBar: () => ({
      icon: ({tintColor: color}) => (
        <Icon name="ios-list" style={{color}}/>
      ),
      visible: true
    }),
  };

  open = (lectureId) => {
    this.props.navigate({
      routeName: 'LectureDetails',
      params: {
        lectureId
      }
    });
  };
  renderRow = (lecture) => {
    return(
      <ListItem button onPress={() => this.open(lecture.id)} avatar key={lecture.id}>
        <Left>
          <Thumbnail source={require('../../../images/pepperoni.png')} />
        </Left>
        <Body>
          <Text>{lecture.title}</Text>
          <Text note>Example Character</Text>
          <Text note>{new Date(lecture.dates).toLocaleDateString('fi-FI')}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>

    );
  };
  render() {
    const {lectures, loading} = this.props;

    return (
      <Container>
        <Content>
          <List dataArray={lectures} renderRow={this.renderRow}/>
        </Content>
      </Container>

    );
  }
};

export default LecturesView;