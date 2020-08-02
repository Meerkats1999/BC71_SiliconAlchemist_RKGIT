from darkflow.net.build import TFNet
from script import *
import numpy as np
import cv2


def boxing(original_img, predictions):
    newImage = np.copy(original_img)
    car = 0
    truck = 0
    motorbike = 0
    for result in predictions:
        if result['label'] == 'car' or result['label'] == 'motorbike' or result['label'] == 'truck':
            if result['label'] == 'car':
                car = car + 1
            if result['label'] == 'motorbike':
                motorbike = motorbike + 1
            if result['label'] == 'truck':
                truck = truck + 1


            top_x = result['topleft']['x']
            top_y = result['topleft']['y']

            btm_x = result['bottomright']['x']
            btm_y = result['bottomright']['y']

            confidence = result['confidence']
            label = result['label'] + " " + str(round(confidence, 3))

            if confidence > 0.3:
                newImage = cv2.rectangle(newImage, (top_x, top_y), (btm_x, btm_y), (255,0,0), 2)

    print ("cars : {}".format(car))
    print ("trucks : {}".format(truck))
    print ("motorbike : {}".format(motorbike))
    print ('\n')
    return newImage

options = {"model": "cfg/yolo.cfg", "load": "bin/yolo.weights", "threshold": 0.3}

tfnet = TFNet(options)

opt = 'video'
while True:
    
    if opt == 'video':
         cap = cv2.VideoCapture('/home/abhrajyoti/stuff/BC71_SiliconAlchemist_RKGIT/ml-model/traffic-density-cctv/input/video.mov')
         width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
         height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

         fourcc = cv2.VideoWriter_fourcc(*'DIVX')
         out = cv2.VideoWriter('/home/abhrajyoti/stuff/BC71_SiliconAlchemist_RKGIT/ml-model/traffic-density-cctv/input/output.avi',fourcc, 20.0, (int(width), int(height)))
         count = 0
         while(True):

              ret, frame = cap.read()


              if ret == True:

                 if count % 8 == 0:
                     print ("frame count : {}".format(count))
                     frame = np.asarray(frame)
                     results = tfnet.return_predict(frame)

                     new_frame = boxing(frame, results)

                    # Display the resulting frame
                     out.write(new_frame)
                     cv2.imshow('frame',new_frame)
                     if cv2.waitKey(1) & 0xFF == ord('q'):
                         break


                 else:
                    frame = np.asarray(frame)
                    out.write(frame)

              else:
                 break
              count = count + 1

         cap.release()
         out.release()
         cv2.destroyAllWindows()
         opt = 'exit'

    elif opt == 'exit':
        print ('exiting....')
        break

    