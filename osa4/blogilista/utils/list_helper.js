const dummy = function (blogs) {
  return 1;
}

const totalLikes = blogs => {
  const reducer = (acc, val) => {
    return acc + val.likes;
  };
  return blogs.reduce(reducer, 0)
};

const favoriteBlog = blogs => {
  const reducer = (acc, val) => {
    return acc.likes > val.likes ? acc : val;
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, 0)
}

const mostBlogs = blogs => {
  const mode = (array) =>
  array.reduce(
    (x, y, i, arr )=>
     (arr.filter(v=>v===x).length>=arr.filter(v=>v===y).length ? x : y),
    null)

  authors = blogs.map(x => x.author)
  count = authors.filter(x => x == mode(authors)).length;

  return authors.length === 0 ? null : {author: mode(authors), blogs: count}
}

const mostLikes = blogs => {

  const reducer = (acc, val) => {
		return totalLikes(blogs.filter(blog => blog.author === acc.author)) > totalLikes(blogs.filter(blog => blog.author === val.author)) ? acc : val;
	};

	const author = blogs.reduce(reducer, 0).author;



	return blogs.length === 0 ? null : {
		author,
		likes: totalLikes(blogs.filter(blog => blog.author === author))
	};

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
