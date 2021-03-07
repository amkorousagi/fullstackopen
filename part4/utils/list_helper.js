//ex 4.3
const _ = require("lodash")
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.map((b) => b.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (best_b, new_b) => {
    return best_b.likes < new_b.likes ? new_b : best_b
  }
  return blogs
    .map((b) => {
      return {
        title: b.title,
        author: b.author,
        likes: b.likes,
      }
    })
    .reduce(reducer, { title: "null", author: "null", likes: 0 })
}

//ex 4.6
const mostBlogs = (blogs) => {
  //make lists for author
  //count length of lists
  const reducer = (best_a, new_a) => {
    //let best_a_name = Object.getOwnPropertyNames(best_a)[0]
    //let new_a_name = Object.getOwnPropertyNames(new_a)[0]

    //return best_a[best_a_name] < new_a[new_a_name] ? new_a : best_a
    return best_a[1] < new_a[1] ? new_a : best_a
  }
  const best_author_object = _.countBy(blogs, "author")
  let best_author = Object.entries(best_author_object).reduce(reducer, [
    "default",
    0,
  ])

  /*
  for(const [key, value] of Object.entries(best_author_object)){
      best_author[key] = value
  }
  */
  return {
    author: best_author[0],
    blogs: best_author[1],
  }
}

//ex 4.7
const mostLikes = (blogs) => {
  //make list for autjor
  //count total likes of lists
  let groupByAuthor = _.groupBy(blogs, "author")
  let entriesGroupByAuthor = Object.entries(groupByAuthor)

  let totalLikesByAuthor = {}
  entriesGroupByAuthor.forEach((list_blogs) => {
    for (let i = 0; i < list_blogs[1].length; i++) {
      totalLikesByAuthor[list_blogs[0]] =
        totalLikesByAuthor[list_blogs[0]] == undefined
          ? 0 + list_blogs[1][i].likes
          : totalLikesByAuthor[list_blogs[0]] + list_blogs[1][i].likes
    }
  })

  const reducer = (best_a, new_a) => {
    return best_a[1] < new_a[1] ? new_a : best_a
  }
  const best_author = Object.entries(totalLikesByAuthor).reduce(reducer, [
    "default",
    -1,
  ])

  return {
    author: best_author[0],
    likes: best_author[1],
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
