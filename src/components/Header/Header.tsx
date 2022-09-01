import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, UnstyledButton, Group, Text, Menu } from "@mantine/core";
import { IconLogout, IconChevronDown, IconHome } from "@tabler/icons";

import { UserContext } from "../../context/UserContext";
import { useStyles } from "./HeaderStyles";
import { EMAIL, LOGOUT } from "../../common/constants";

import "./Header.scss";

const Header = () => {
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
  const { logout } = useContext(UserContext);
  const email = localStorage.getItem(EMAIL);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <Group position="apart">
          <Link to="/">
            <IconHome className="home-icon" />
          </Link>

          <Menu
            width={185}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {email}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={onLogout}
                icon={<IconLogout size={14} stroke={1.5} />}
              >
                {LOGOUT}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
