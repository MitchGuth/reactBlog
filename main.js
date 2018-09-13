const h = React.createElement;

const initialBlogsList = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    }
];

let PageTitle = (props) =>
    h('h1', {className: 'page-title'}, [props.text]);

let BlogTitle = (props) => 
    h('h2', {className: 'blog-title'}, [props.title]);

let BlogBody = (props) => 
    h('p', {className: 'blog-body'}, [props.body]);

let PageList = (props) =>
    h('ul', {className: 'content-container'}, 
        props.stuff.map(blog=>
        h(BlogRow, {blog, removeBlog: props.removeBlog, snakifyTitle: props.snakifyTitle}))
);

let BlogRow = (props) => 
    h('li', {}, [
        h(BlogTitle, {title: props.blog.title}),
        h(Snakify, {blog: props.blog, snakifyTitle: props.snakifyTitle}),
        h(BlogBody, {body: props.blog.body}),
        h(RemoveBlog, {removeBlog: props.removeBlog, blog: props.blog}),
]);

let RemoveBlog = (props) =>
    h('button', {
        onClick: () =>{
            props.removeBlog(props.blog.id)
            render();
        }
    },    'Delete Me!');

let Snakify = (props) =>
    h('button', {
        onClick: () => {
            props.snakifyTitle(props.blog)
            render();
        }
    }, 'Add S');

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsList: initialBlogsList.slice(),
        };
    }
    render() {
        let snakifyTitle = (theOneBlog) => {
            let newBlogsList = this.state.blogsList.map(blog =>{
                if(blog.id === theOneBlog.id){
                    let blogCopy = Object.assign({}, blog)
                    blogCopy.title += 's';
                    return blogCopy;
                }
                else{
                    return blog;
                }
            })
            this.setState({blogsList: newBlogsList});
        }
        let removeBlog = (id) =>{
            this.setState({blogsList: this.state.blogsList.filter(blog => blog.id !== id)});
        }
        return h('div', {}, [
            h(PageTitle, {text: 'Blogs: '}),
            h(PageList, {stuff: this.state.blogsList, removeBlog: removeBlog, snakifyTitle: snakifyTitle}),
            h('a', {href: 'www.nasa.com'}, ['More Fun!'])
        ])
    }
}

let render = () =>
    ReactDOM.render(h(Homepage), document.querySelector('.react-root'))

render();