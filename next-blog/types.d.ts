interface Post {
    title: string
    author: Author
    slug: string
    categories: Category[]
    featuredImage: {
        url: string
    }
    content: {
        raw: {
            children: any
        }
    }
    createdAt: any
}

interface Author {
    name: string
    bio: string
    photo: {
        url: string
    }
}

interface Category {
    name: string
    slug: string
}

interface CommentObj {
    name: string,
    email: string,
    comment: string,
    slug: string
}