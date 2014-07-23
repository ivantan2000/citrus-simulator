/*
 * Copyright 2006-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.consol.citrus.simulator;

import com.consol.citrus.channel.ChannelSyncEndpoint;
import com.consol.citrus.dsl.CitrusTestBuilder;
import com.consol.citrus.dsl.definition.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * @author Christoph Deppisch
 */
public class AbstractSimulatorBuilder extends CitrusTestBuilder {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    @Qualifier("simInboundEndpoint")
    protected ChannelSyncEndpoint simInbound;

    protected ReceiveMessageActionDefinition receiveSOAPRequest() {
        return (ReceiveMessageActionDefinition)
                receive(simInbound)
                    .description("Received Simulator SOAP request");
    }

    protected SendMessageActionDefinition sendSOAPResponse() {
        return (SendMessageActionDefinition)
                send(simInbound)
                    .description("Sending Simulator SOAP response");
    }

    protected SendSoapFaultActionDefinition sendSoapFault() {
        return (SendSoapFaultActionDefinition)
                sendSoapFault(simInbound)
                    .description("Sending Simulator SOAP fault");
    }

}