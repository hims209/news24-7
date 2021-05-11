export class Story {
  _id: number;
  title: String;
  description: String;
  url: String;
  imageUrl: String;
  publishDate: String;
  type:String;


  //News story model
    constructor(
    _id,
    title,
    description = '',
    url ='',
    imageUrl='',
    type='',
    publishDate=''
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.url = url;
    this.type = type;
    this.imageUrl = imageUrl
  }
}

