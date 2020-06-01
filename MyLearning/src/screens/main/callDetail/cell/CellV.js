import {
  Body,
  Button,
  Left,
  ListItem,
  Right,
  Text,
  View,
} from 'native-base'
import {
  Colors,
  Icons,
} from '@src/assets'
import { Image, StyleSheet, } from 'react-native'
import React from 'react'

const Cell = ({ title, description, duration, dateLog, isShowDuration, }) => (
  <ListItem style={styles.containerItem}>
    <Left flex0 style={styles.leftContainer}>
      <View style={styles.avatar}>
        <Image source={Icons.outgoingCall} />
      </View>
    </Left>

    <Body style={styles.containerBody}>
      <Text semi-bold text-bold style={styles.title}>{title}</Text>
      <Text text-detail-grey-small numberOfLines={1} style={styles.note}>{description}</Text>
    </Body>

    <Right>
      <Button transparent>
        <View horizontal v-center>
          <View>
            <Text text-detail-grey-small text-right style={styles.textDateLog}>{dateLog}</Text>
            {!isShowDuration && (<Text style={styles.duration}>{duration}</Text>) }
          </View>
        </View>
      </Button>

    </Right>
  </ListItem>
)

const styles = StyleSheet.create({
  containerBody: {
    marginLeft: 10,
  },
  containerItem: {
    backgroundColor: Colors.white,
    marginLeft: null,
    paddingEnd: 20,
  },
  duration: {
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  leftContainer: {
    marginLeft: 20,
  },
  note: {
    marginBottom: 1,
  },
  textDateLog: {
    minWidth: 100,
  },
  title: {
    color: Colors.black,
    marginTop: 1,
  },
})

export default Cell
