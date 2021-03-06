import React, { ChangeEvent, useState } from 'react';
import { css } from 'emotion';

import { Forms } from '../index';
import { Icon } from './Icon';
import { getAvailableIcons, IconType } from './types';
import { withCenteredStory } from '../../utils/storybook/withCenteredStory';
import { useTheme, selectThemeVariant } from '../../themes';
import mdx from './Icon.mdx';

export default {
  title: 'General/Icon',
  component: Icon,
  decorators: [withCenteredStory],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const IconWrapper: React.FC<{ name: IconType }> = ({ name }) => {
  const theme = useTheme();
  const borderColor = selectThemeVariant(
    {
      light: theme.colors.gray5,
      dark: theme.colors.dark6,
    },
    theme.type
  );

  return (
    <div
      className={css`
        width: 150px;
        padding: 12px;
        border: 1px solid ${borderColor};
        text-align: center;

        &:hover {
          background: ${borderColor};
        }
      `}
    >
      <Icon
        name={name}
        className={css`
          font-size: 18px;
        `}
      />
      <div
        className={css`
          padding-top: 16px;
          word-break: break-all;
          font-family: ${theme.typography.fontFamily.monospace};
          font-size: ${theme.typography.size.xs};
        `}
      >
        {name}
      </div>
    </div>
  );
};

const icons = getAvailableIcons().sort((a, b) => a.localeCompare(b));

export const simple = () => {
  const [filter, setFilter] = useState('');

  const searchIcon = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      <Forms.Field
        className={css`
          width: 300px;
        `}
      >
        <Forms.Input onChange={searchIcon} placeholder="Search icons by name" />
      </Forms.Field>
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {icons
          .filter(val => val.includes(filter))
          .map(i => {
            return <IconWrapper name={i} key={i} />;
          })}
      </div>
    </div>
  );
};
