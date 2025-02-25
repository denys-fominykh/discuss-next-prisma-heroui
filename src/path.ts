const paths = {
  home: (): string => '/',
  topicShow: (topicSlag: string): string => `/topics/${topicSlag}`,
  postCreate: (topicSlag: string): string => `/topics/${topicSlag}/posts/new`,
  postShow: (topicSlag: string, postId: string) => `/topics/${topicSlag}/posts/${postId}`,
} as const;

export default paths;
