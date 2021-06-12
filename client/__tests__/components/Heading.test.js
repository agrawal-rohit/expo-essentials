/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';

import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import Heading from '../../app/components/Heading';
import lightTheme from '../../app/config/lightTheme';
import darkTheme from '../../app/config/darkTheme';

describe('<Heading />', () => {
  it('has 1 child', () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={eva.light}>
          <Heading>Test Heading</Heading>
        </ApplicationProvider>,
      )
      .toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('works correctly in light theme', () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...lightTheme }}>
          <Heading>Test Heading</Heading>
        </ApplicationProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('works correctly in dark theme', () => {
    const tree = renderer
      .create(
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...darkTheme }}>
          <Heading>Test Heading</Heading>
        </ApplicationProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
