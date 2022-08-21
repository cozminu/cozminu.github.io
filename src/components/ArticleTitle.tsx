
function ArticleTitle(props: any) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.children}</h2>
        </div>
    )
}



export default ArticleTitle;