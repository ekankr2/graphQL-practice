interface Post {
    title: string
    author: {
        name: string
        photo: {
            url: string
        }
    }
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

interface Category {
    name: string
    slug: string
}