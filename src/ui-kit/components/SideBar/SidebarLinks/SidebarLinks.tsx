import { SidebarLink } from 'ui-kit/components/SidebarLink';

import s from './SidebarLinks.module.scss';
import useAppSelector from 'hooks/useAppSelector';

interface SidebarLinksProps {
  isHiddenVariant: boolean;
  onClick: () => void;
  links: {
    id: string;
    linkAddress: string;
    label: string;
  }[];
}

type FakeStateType = {
  [idx: string]: {
    [idx: string]: boolean;
  };
};

const fakeState: FakeStateType = {
  main: {
    isActive: true,
  },
  test: {
    isActive: true,
    isPassed: false,
    isSuccess: false,
  },
  task: {
    isActive: false,
    isPassed: false,
    isSuccess: false,
  },
  interview: {
    isActive: false,
    isPassed: false,
    isSuccess: false,
  },
  offer: {
    isActive: false,
    isPassed: false,
    isSuccess: false,
  },
};

export const SidebarLinks = ({ links, isHiddenVariant, onClick }: SidebarLinksProps) => {
  const userDirection = useAppSelector((state) => state.auth.user.direction);
  const elements = links.map(({ id, linkAddress, label }) => {
    if (id === 'test' && userDirection === 'QA') {
      return;
    }
    return (
      <SidebarLink
        key={id}
        iconName={id}
        label={label}
        linkAddress={linkAddress}
        isClickable={fakeState[id].isActive}
        isHiddenVariant={isHiddenVariant}
        onClick={onClick}
      />
    );
  });

  return (
    <nav>
      <ul className={s.list}>{elements}</ul>
    </nav>
  );
};
