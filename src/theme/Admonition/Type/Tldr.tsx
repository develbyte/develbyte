import React from 'react';
import Layout from '@theme/Admonition/Layout';
import IconTldr from '@theme/Admonition/Icon/Tldr';
import type {Props} from '@theme/Admonition/Type/Tldr';

const infimaClassName = 'alert alert--tldr';

const defaultProps = {
  icon: <IconTldr />,
  title: 'TLDR;',
};

export default function AdmonitionTypeTldr(props: Props): JSX.Element {
  return (
    <Layout {...defaultProps} {...props} className={infimaClassName}>
      {props.children}
    </Layout>
  );
}

