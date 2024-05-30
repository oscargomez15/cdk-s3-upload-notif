import * as cdk from 'aws-cdk-lib';
import { SqsDestination } from 'aws-cdk-lib/aws-appconfig';
import { Bucket, BucketNotificationDestinationType, CfnBucket, EventType } from 'aws-cdk-lib/aws-s3';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as s3n from '@aws-cdk/aws-s3-notifications';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //L1 and L2 Construct of an S3 Bucket

    const leve1S3Bucket = new CfnBucket(this, 'MyFirstLvl1Construct',{
      versioningConfiguration:{
        status: "Enabled"
      }
    });

    const Level2S3Bucket = new Bucket(this, 'myFirstLvl2ConstructBucket',{
      bucketName:"s3bucketusingcdk",
      versioned:true
    });

    const queue = new Queue(this, "MyQueue",{
      queueName:"MyQueue"
    })

    Level2S3Bucket.addEventNotification(EventType.OBJECT_CREATED_COPY, new cdk.aws_s3_notifications.SqsDestination(queue))
  }
}
