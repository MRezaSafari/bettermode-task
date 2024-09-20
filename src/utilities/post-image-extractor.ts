const extractPostImageUrl = (value?: string) => {
  if (!value) return;

  const transformedValue = JSON.parse(value) as {
    id: string;
    relation: string;
  };

  return `https://tribe-s3-production.imgix.net/${transformedValue.id}?fit=max&w=200&auto=compress,format`;
};

export default extractPostImageUrl;
