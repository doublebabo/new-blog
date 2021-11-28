# React Router 6

## 1.基础使用
**BrowserRouter**必须包裹在整个app的最外层

```react
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="invoices" element={<Invoices />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      {/*使用Link 进行路由跳转跳转*/}
      <Link to="/invoices">Invoices</Link> |{" "}
    </div>
  );
}

export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```
## 2.嵌套路由
<Route>里面有<Route>,嵌套路由的实现做了两件事

* 将routes嵌套在被嵌套route内
* 渲染一个Outlet

```react
import { Outlet, Link } from "react-router-dom";
// 这里的App是一个Route
export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet /> {/*注意点*/}
    </div>
  );
}
```

## 3.路由传参&路由遍历

```react
export default function Invoices() {
  let invoices = getInvoices();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem"
        }}
      >
        {invoices.map(invoice => (
        {/*注意点见 👇*/}
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
          {/*注意点见 👆*/}
        ))}
      </nav>
    </div>
  );
}
```

## 4. 设置No Match 路由

```react
<Routes>
  <Route path="/" element={<App />}>
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
    <Route
      path="*" {/*👈*/}
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
  </Route>
</Routes>
```

## 5.读取URL参数

使用**useParams()**

```react
// 跳转到invoice组件
<Link
    to={`/invoices/2312`}
    key={invoice.number}
    >
    {invoice.name}
</Link>
```

```react
import { useParams } from "react-router-dom";

export default function Invoice() {
  let params = useParams();  // 这边获取到2312
  return <h2>Invoice: {params.invoiceId}</h2>; 
}
```

## 6. Index路由

当**子路由**中没有一个能和url匹配时，将会走**index**这个子路由

```react
<Routes>
    <Route path="/in" element={<Home />}>
        <Route
            index {/*👈*/}
            element={
                <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                </main>
            }
            />
        <Route path=":in" element={<In />} />
    </Route>
    <Route
        path="*"
        element={<NotFound/>}
        />
</Routes>
```

```react
export default function Home() {
    return (
        <h1>
            Home
            {/*url为/in时，outlet将渲染 <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                </main>*/}
            {/*url为/in/1234时，outlet将渲染 <In />*/}
            <Outlet/>  {/*👈*/}
        </h1>
    );
}
```

## 7.active Link
常见的使用场景：导航栏
如何使用：<NavLink>
和<Link>的区别： NavLink可以接受isActive

```react
<nav>
    {invoices.map(invoice => (
        <NavLink
            {/*👇*/}
            style={({ isActive }) => { 
                return {
                    display: "block",
                    margin: "1rem 0",
                    color: isActive ? "red" : ""
                };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
            >
            {invoice.name}
        </NavLink>
    ))}
</nav>
```
```react
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

## 8.search params

用于获取**/shoes?brand=nike&sort=asc&sortby=price**中的值
使用方法：let [searchParams, setSearchParams] = useSearchParams();
		searchParams.get('brand')；
		setSearchParams（{brand}）将会改变 浏览器地址对应brand的值

```react
export default function Home() {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <h1>
            <input
                value={searchParams.get("name") || ""}
                onChange={event => {
                    let name = event.target.value;
                    if (name) {
                        setSearchParams({ name });
                    } else {
                        setSearchParams({});
                    }
                }}
            />
            ))}
            Home
        </h1>
    );
}  
```

## 9.NavLink and useLocation

组合使用 用来保存跳转过程中url的query保留
```react
function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}
```

## 10. 编程路由跳转

使用方式：let navigate = useNavigate();
		navigate("/invoices");

```react
import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
```