 resource "aws_sns_topic" "test-sns" {
    for_each = toset(var.sns_topics)
    name = each.value
  
}

resource "aws_sqs_queue" "test-queue" {
  name = "test-queue"
}


resource "aws_sns_topic_subscription" "test-subscription" {
    for_each = toset(var.sns_topics) 
    protocol = "sqs"
    endpoint = aws_sqs_queue.test-queue.arn
    topic_arn = aws_sns_topic.test-sns[each.key].arn
  
}