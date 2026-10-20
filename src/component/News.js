import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'a87de602390848d4829bbd2cffed9383'; // 🔒 Replace with your actual key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: 'technology',
            pageSize: 9,
            apiKey: API_KEY,
          },
        });
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError('Failed to load news articles.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="px-4 px-md-5 py-5 bg-light">
      <h1 className="text-center mb-5">📰 Latest Tech News</h1>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      <div className="row justify-content-center gx-4 gy-4">
        {articles.map((article, index) => (
          <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex" key={index}>
            <div className="card shadow-sm w-100 h-100 d-flex flex-column">
              {/* Image with padding and centered */}
              <div
                className="p-3 d-flex justify-content-center align-items-center"
                style={{ height: '220px', backgroundColor: '#f8f9fa' }}
              >
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="img-fluid rounded"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <div className="text-muted text-center">No Image Available</div>
                )}
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description || 'No description available.'}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </div>

              <div className="card-footer text-muted small">
                Source: {article.source.name} <br />
                {new Date(article.publishedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
