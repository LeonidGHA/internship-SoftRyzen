# даний компонент приймає такі Props:

# 1) children: Масив React компонентів

```bash
children={[<Menu menu={menu}/>, <Menu menu={userMenu}/>]};
```

# 2) spaceBetween: необов'язковий props, визначає відстань між елементами масиву, якщо це портібно, приймає string

```bash
spaceBetween='388px';
```

# 3) sticky: boolean - необов'язковий props, якщо треба зробити сайдбар липким

# 4) top: string - необов'язковий props, якщо ви маєте ліпкий хедер, вказуєте висоту хедеру в px. за замовчуванням 0px;

# також для правильного рендерингу компонентів потрібно створити хук useContext();

```bash
import { createContext, useContext} from 'react';

export const SideBarContext = createContext(null);
export const UseSideBarContext = () => useContext(SideBarContext);
```

# та зробити правильний імпорт в ваші компоненти

# це в батьківський елемент (SideBar)

```bash
import { SideBarContext } from 'pathToThisHook';
```

# це в елемент children (Menu)

```bash
import { UseSideBarContext } from 'pathToThisHook';
```
