import React, { Component, PropTypes } from 'react'
import ArticleList from '../components/ArticleList'
import { connect } from 'react-redux'
import { loadAllArticles, loadAllArticlesAlt } from '../AC/articles'

class Articles extends Component {
    static propTypes = {

    };

    componentDidMount() {
        const { loadAllArticles, loading, loaded } = this.props
        if (!loaded && !loading) loadAllArticles()
    }

    render() {
        const { articles, loading } = this.props
        if (loading) return <h1>Loading...</h1>
        return <div>
            <ArticleList articles = {articles} />
            {this.props.children}
        </div>
    }
}

export default connect(({ articles, filters }) => {
    return {
        loading: articles.get('loading'),
        loaded: articles.get('loaded'),
        articles: filterArticles(articles.get('entities'), filters)
    }
}, {
    loadAllArticles: loadAllArticlesAlt
})(Articles)

function filterArticles(articles, { from, to, selectedArticles }) {
    return articles.valueSeq()
        .filter((article) => selectedArticles.length ? selectedArticles.includes(article.id) : true)
        .filter(article => (!from || Date.parse(article.date) > from) && (!to || Date.parse(article.date) < to))
}