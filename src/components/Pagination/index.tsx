/* eslint-disable react-native/no-inline-styles */
import { difference, intersection, range, union } from '../../utils/utils';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Touchable from '../Touchable';
import TextView from '../Typography';
import { coreLightGray, primary } from '../../../src/styles/colors';
import Icon from '../Icon';

export const generatePages = (pageCount: number, currentPage: number) => {
  const w = 4;

  let pages = range(1, pageCount);

  let diff;
  const first = pages.slice(0, w);

  const last = pages.slice(-w);

  let currentStart = currentPage - 1 - w;

  if (currentStart < 0) {
    currentStart = 0;
  }

  let currentEnd = currentPage - 1 + w;

  if (currentEnd < 0) {
    currentEnd = 0;
  }

  const current = pages.slice(currentStart, currentEnd);

  pages = [];

  if (intersection(first, current).length === 0) {
    pages = pages.concat(first);
    diff = current[0] - first[first.length - 1];

    if (diff === 2) {
      pages.push(current[0] - 1);
    } else if (diff !== 1) {
      pages.push(-1);
    }

    pages = pages.concat(current);
  } else {
    pages = union(first, current);
  }

  if (intersection(current, last).length === 0) {
    diff = last[0] - pages[pages.length - 1];

    if (diff === 2) {
      pages.push(last[0] - 1);
    } else if (diff !== 1) {
      pages.push(-1);
    }

    pages = pages.concat(last);
  } else {
    diff = difference(last, current);
    pages = pages.concat(diff);
  }

  return pages;
};

const Page = (props: any) => {
  const { onPage, currentPage, page } = props;
  const goto = (pg: number) => {
    onPage(pg);
  };

  const onClick = () => {
    goto(page);
  };

  if (page !== -1) {
    return (
      <Touchable
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 30,
          marginHorizontal: 3,
          backgroundColor: page === currentPage ? primary : '#fff',
        }}
        onPress={() => page !== currentPage && onClick()}
      >
        <TextView
          style={{
            color: page === currentPage ? '#fff' : '#000',
          }}
        >
          {page}
        </TextView>
      </Touchable>
    );
  }

  return (
    <View
      style={{
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
      }}
    >
      <TextView>...</TextView>
    </View>
  );
};

const Pagination = (props: any) => {
  const {
    onPage,
    currentPage,
    totalPagesCount,
    isPaginated,
    pages = [],
    containerStyle,
  } = props;
  const goto = (page: number) => {
    onPage(page);
  };

  const onPrev = () => {
    const page = (currentPage || 1) - 1;

    if (page > 0) {
      goto(page);
    }
  };

  const onNext = () => {
    const page = (currentPage || 1) + 1;

    if (page <= totalPagesCount) {
      goto(page);
    }
  };

  const renderBar = () => {
    if (!isPaginated) {
      return null;
    }

    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={[
          {
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: '#fff',
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 5,
          }}
        >
          <Touchable
            activeOpacity={currentPage > 1 ? 0.6 : 1}
            style={{ padding: 5, marginEnd: 5 }}
            onPress={() => currentPage > 1 && onPrev()}
          >
            <Icon
              name="arrow-left-line"
              size={20}
              color={currentPage > 1 ? '#000' : coreLightGray}
              source={undefined}
            />
          </Touchable>

          {pages.map((page: any, index: number) => (
            <Page
              key={index}
              currentPage={currentPage}
              page={page}
              onPage={onPage}
            />
          ))}
          <Touchable
            activeOpacity={currentPage < totalPagesCount ? 0.6 : 1}
            style={{ padding: 5, marginStart: 5 }}
            onPress={() => currentPage < totalPagesCount && onNext()}
          >
            <Icon
              name="arrow-right-line"
              size={20}
              color={currentPage < totalPagesCount ? '#000' : coreLightGray}
              source={undefined}
            />
          </Touchable>
        </View>
      </ScrollView>
    );
  };

  return <View>{renderBar()}</View>;
};

const PaginationContainer = (props: any) => {
  const { count = 100, page = 1, onPage, containerStyle } = props;

  let totalPagesCount = parseInt((count / 20).toString(), 10) + 1;
  let currentPage = page;
  if (count % 20 === 0) {
    totalPagesCount -= 1;
  }

  const pages = generatePages(totalPagesCount, page);

  const childProps = {
    ...props,
    currentPage,
    isPaginated: totalPagesCount > 1,
    totalPagesCount,
    pages,
    onPage,
    containerStyle,
  };

  return <Pagination {...childProps} />;
};

export default PaginationContainer;
