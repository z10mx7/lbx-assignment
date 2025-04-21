import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Lobox
        </Text>
        {'  '}
        <span className="text-[#5384EE]">Assignment</span>
      </Title>
      <div className="flex items-center justify-center mx-auto mt-8">
        You can see the source code here:
        <Link prefetch={false} className="ml-2" href="https://github.com/z10mx7/lbx-assignment">
          <Icon icon="fa:github" className="text-3xl text-gray-800" />
        </Link>
      </div>
    </>
  );
}
