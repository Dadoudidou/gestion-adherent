import * as React from "react";
import * as moment from "moment";

import { storiesOf } from "@storybook/react"
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { text, select, boolean, number } from "@storybook/addon-knobs/react";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf('Button', module)
  .add('with text', () => (
    <div onClick={action('clicked')}>Hello Button</div>
  ))
  .add('with some emoji', () => (
    <div onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></div>
  ));  