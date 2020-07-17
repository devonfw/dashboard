import React from 'react';
import Link, { LinkProps } from 'next/link';
import { ButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/core';
import { Url, UrlObject } from 'url';

export type NextLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

type Ref = HTMLAnchorElement;

interface BasicLinkProps {
  href: Url;
  as: string | UrlObject | undefined;
  prefetch: boolean | undefined;
}

const NextLink = React.forwardRef<Ref, NextLinkProps>(
  ({ href, as, prefetch, ...props }: BasicLinkProps, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <a ref={ref} {...props} />
    </Link>
  )
);

NextLink.displayName = 'NextLink';

export default NextLink;
