/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';

import Icon from '../Icon';
import TextView from '../Typography';
import Touchable from '../Touchable';
import { useAlert } from '../../core/alert';
import { white } from '../../styles/colors';
import { withTheme } from '../../core/theming';

const PreparedAttachment: React.FC<any> = ({
  attachments,
  setAttachments,
  deleteHandler,
  theme,
}) => {
  const { colors } = theme;

  const alert = useAlert();

  const attachmentsRef = useRef<any>();
  const indexDeleteAttachment = useRef<number>(0);
  const tempDelete = useRef<any[]>([]);

  const onAttachError = (message: string) => {
    alert.error(message);
  };

  const onDeleteStart = () => {
    tempDelete.current = [...attachments];
    tempDelete.current[indexDeleteAttachment.current] = {
      ...tempDelete.current[indexDeleteAttachment.current],
      isLoading: true,
    };
    setAttachments(tempDelete.current);
  };

  const onDeleteEnd = () => {
    tempDelete.current.splice(indexDeleteAttachment.current, 1);
    setAttachments(tempDelete.current);
    alert.info('File is deleted');
  };

  const onPress = (index: number) => {
    let loading = false;
    attachments.find((item: any) => {
      if (item.isLoading) {
        loading = true;
      }
      return;
    });
    if (loading) {
      return alert.info('Please wait!');
    }
    indexDeleteAttachment.current = index;
    deleteHandler(
      attachments[index].name,
      onDeleteStart,
      onAttachError,
      onDeleteEnd
    );
  };

  const renderPreparedAttachments = ({ item, index }: any) => {
    return (
      <View style={[styles.group, { backgroundColor: colors.primary }]}>
        <Icon source={'file-line'} size={18} color={white} />
        <TextView
          style={{
            color: white,
            marginStart: 5,
          }}
        >
          {Math.round(item.size / 1000) + 'kB'}
        </TextView>
        <View style={{ marginStart: 5 }}>
          {!item.isLoading ? (
            <Touchable onPress={() => onPress(index)}>
              <Icon source={'close-line'} size={20} color={white} />
            </Touchable>
          ) : (
            <View style={styles.loaderGroup}>
              <ActivityIndicator size="small" color={white} />
            </View>
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (attachments?.length > 0 && attachmentsRef.current) {
      attachmentsRef.current.scrollToIndex({
        animated: true,
        index: attachments?.length - 1,
      });
    }
  }, [attachments]);

  if (attachments?.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          initialScrollIndex={0}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              attachmentsRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          ref={attachmentsRef}
          horizontal={true}
          data={attachments}
          renderItem={renderPreparedAttachments}
          keyExtractor={(_item, index) => index.toString()}
          ItemSeparatorComponent={() => {
            return <View style={{ width: 3 }} />;
          }}
        />
      </View>
    );
  }

  return null;
};

export default withTheme(PreparedAttachment);

const styles = StyleSheet.create({
  container: { marginHorizontal: 20, marginBottom: 10 },
  group: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingStart: 10,
  },
  loaderGroup: {
    width: 20,
    height: 20,
  },
});
